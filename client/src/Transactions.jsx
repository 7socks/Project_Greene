

  import React, {useEffect, useState} from "react";
  import Cell from './Cell.jsx'

//   -- STATE POSSIBILITIES:
// -- unclaimed
// -- claimed
// -- approved
// -- donated

// should History in Front end be "History of Donations"
  // it refers to history of things donated instead of history of things received



  var data = {
    lat: '30.267741514111805',
    lng: '-97.83300335500589',
    created_at: '2022-05-10T16:09:35.709Z',
    updated_at: '2022-05-10T16:09:35.709Z',
    id: 5,
    last_name: 'Shmo',
    user_name: 'not2not',
    first_name: 'Tim',
    charity_state: 'true',
    interested: [
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.842Z',
        updated_at: '2022-05-10T16:09:35.842Z',
        id: 1602,
        posted_by: 'evenprove',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'chinos',
        category: 'toy',
        description: 'super cool',
        approved_user: null,
        charity_only: false,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'unclaimed'
      },
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.902Z',
        updated_at: '2022-05-10T16:09:35.902Z',
        id: 2290,
        posted_by: 'clothesisim',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'My old things',
        category: 'Jacket',
        description: 'Regifted ughhh',
        approved_user: null,
        charity_only: true,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'unclaimed'
      }
    ],
    received: [],
    donated: [
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.765Z',
        updated_at: '2022-05-10T16:09:35.765Z',
        id: 9,
        posted_by: 'not2not',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'this probably doenst match',
        category: 'Jacket',
        description: 'Regifted ughhh',
        approved_user: null,
        charity_only: false,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'unclaimed'
      },
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.765Z',
        updated_at: '2022-05-10T16:09:35.765Z',
        id: 10,
        posted_by: 'not2not',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'My old things',
        category: 'Jumpa',
        description: 'Just need to get rid of',
        approved_user: null,
        charity_only: true,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'unclaimed'
      },
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.765Z',
        updated_at: '2022-05-10T16:09:35.765Z',
        id: 11,
        posted_by: 'not2not',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'LIKE NEW',
        category: 'Jacket',
        description: 'Regifted ughhh',
        approved_user: null,
        charity_only: false,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'approved'
      },
      {
        lat: '30.267741514111805',
        lng: '-97.83300335500589',
        created_at: '2022-05-10T16:09:35.765Z',
        updated_at: '2022-05-10T16:09:35.765Z',
        id: 12,
        posted_by: 'not2not',
        taken_by: null,
        pictures: null,
        tag: ['tag1', 'tag2'],
        title: 'this probably doenst match',
        category: 'Jacket',
        description: 'super cool',
        approved_user: null,
        charity_only: false,
        interested_users: ['interestedUser1', 'interestedUser2'],
        state: 'donated'
      }
    ]
  }

  const Transactions = () =>{
    const [group, setGroup] = useState('');
    const [status, setStatus] = useState('');
    const [items, setItems] = useState();

    console.log(data.donated)

    var newGroup = [];

    if (group === 'both') {
      data.interested.forEach(item => {
        if (item.state === status) {
          newGroup.push(item);
        }
      });
    } else if (group === 'received') {
      data.received.forEach(item => {
        if (item.state === status) {
          newGroup.push(item);
        }
      });
    } else if (group === 'donations') {
      data.donated.forEach(item => {
        if (item.state === status) {
          newGroup.push(item);
        }
      });
    }

    setGroup(newGroup);


    return (
        <div>
          <div>
            <button onClick={() => setGroup('both')}>Both</button>
            <button onClick={() => setGroup('received')}>Received</button>
            <button onClick={() => setGroup('donations')}>Donations</button>
          </div>
          <div>
            <button onClick={() => setStatus('approved')}>Pending</button>
            <button onClick={() => setStatus('claimed')}>Claimed</button>
            <button onClick={() => setStatus('unclaimed')}>Unclaimed</button>
            <button onClick={() => setStatus('donated')}>History</button>
          </div>
          <div>

            <Cell />
          </div>

        </div>

    )
  }

  export default Transactions;


