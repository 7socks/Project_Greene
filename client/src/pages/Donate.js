import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom"
import { ButtonL, ButtonM, ButtonS } from '../styles/buttons.js';
import TagsContainer from '../components/TagsContainer.js';
import ToggleSwitch from '../components/ToggleSwitch.js';
import ImageUploader from '../components/ImageUploader.js';
import api from '../api/index.js';

const categories = [
  'Accessories',
  'Arts & Crafts',
  'Baby',
  'Books',
  'Clothing',
  'Education',
  'Electronics',
  'Food',
  'Garden',
  'Home & Furniture',
  'Jewelry',
  'Kitchenware',
  'Movies',
  'Music',
  'Musical Instruments',
  'Office & Stationery',
  'Personal Care',
  'Pet Supplies',
  'Sports',
  'Tools',
  'Toys',
  'Video Games',
  'Other'
];

const DonateContainer = styled.div`
  * {
    margin: .3em 0;
  }

  .charity-toggle {
    margin: 0;
  }

  span {
    margin-left: .4em;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 80%;
`;

const FieldSection = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2em;
`;

const SubmitButton = styled(ButtonS)`
  :disabled {
    color: #999;
    border-color: #999;

    :hover {
      color: #999;
      background: transparent;
    }
  }
`;

const StyledAsterisk = styled.span`
  color: red;
`;
const Asterisk = () => {
  return (<StyledAsterisk>*</StyledAsterisk>);
}

const ErrorMessage = styled.div`
  color: red;
`;


function Donate({ state, dispatch, init }) {
  const { donate, dev } = state;
  let navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select a Category');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [charityOnly, setCharityOnly] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [valid, setValid] = useState(false);

  const grabData = (data) => {
    return {
      posted_by: state.user.user_name,
      lat: state.user.lat,
      lng: state.user.lng,
      title: data.title || title,
      description: data.description || description,
      category: data.category || category,
      tag: tags,
      charity_only: charityOnly,
      pictures: photo ? [photo] : []
    };
  };

  const setState = (field, data) => {
    const states = {
      title: setTitle,
      description: setDescription,
      category: setCategory,
      charityOnly: setCharityOnly,
      tag: setTag
    };

    let set = states[field];
    set(data);
    setValid(validate(grabData({[field]: data})));
  };

  const handleChange = (e) => {
    setState(e.target.name, e.target.value);
  };

  const addTag = () => {
    if (tag.length > 0 && !tags.includes(tag)) {
      const newTags = tags.slice().concat([tag]);
      setTags(newTags);
      setTag('');
    }
  };

  const removeTag = (e) => {
    let tagIndex = e.target.id.slice(4);
    const newTags = tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1));
    setTags(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addTag();
  }

  const cancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const submitForm = (e) => {
    e.preventDefault();
    let data = grabData();

    if (validate(data)) {
      api.post.donation(data)
        .then((res) => {
          console.log(res);
          navigate('/Transactions');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (data) => {
    if (data.title.length < 1) {
      return false;
    } else if (data.description.length < 1) {
      return false;
    } else if (data.category === 'Select a Category') {
      return false;
    } else if (data.user_name === null) {
      return false;
    } else if (data.lat === null || data.lng === null) {
      return false;
    }
    return true;
  };

  return (
    <DonateContainer>
      <h2>Tell us about your donation</h2>
      <StyledForm>
        <FieldSection htmlFor="title">
          <span>Listing Title <Asterisk/></span>
          <input type="text" name="title" id="title" value={title} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="description">
          <span>Description <Asterisk/></span>
          <textarea name="description" id="description" value={description} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="category">
          <span>Category <Asterisk/></span>
          <select name="category" id="category" value={category} onChange={handleChange} required>
            {
              ([<option key="none" value="Select a Category">Select a Category</option>])
              .concat(
                categories.map((category, i) => {
                  return <option key={i} value={category}>{category}</option>
                }))
            }
          </select>
        </FieldSection>

        <FieldSection htmlFor="tag">
          <span>Add tags</span>
          <span>
            <input type="text" name="tag" id="tag" value={tag} onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={handleClick}>+</button>
          </span>
          {tags.length > 0 ? <span>Click to remove</span> : null}
          <TagsContainer tags={tags} onClick={removeTag} clickable={true}/>
        </FieldSection>

        <ToggleSwitch on="Charity only" off="Available to everyone" defaultValue={true} onChange={setCharityOnly} />

        <FieldSection htmlFor="photo">
          <span>Click to add or drag in a photo</span>
          <ImageUploader upload={setPhoto} />
        </FieldSection>
      </StyledForm>

      <ButtonBox>
        <ButtonS name="cancel" onClick={cancel}>Cancel</ButtonS>
        <SubmitButton name="post" disabled={!valid}>List Donation</SubmitButton>
      </ButtonBox>
    </DonateContainer>
  );
}

export default Donate;