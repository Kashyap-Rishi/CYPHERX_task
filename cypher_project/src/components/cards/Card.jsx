// import CardItems from '../cardItems/CardItems';
import './card.css'
import { useContext,useState,useEffect } from 'react'
import DataContext from '../../context/data/DataContext'

const Card = () => {

  const data = useContext(DataContext);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (data) {
      const adjustedTickets = groupAndSortTickets(data.tickets, groupingOption, sortingOption);
      setDisplayedTickets(adjustedTickets);
    }
  }, [data, groupingOption, sortingOption]);

  const groupAndSortTickets = (tickets, groupingOption, sortingOption) => {
    let adjustedTickets = [...tickets];

    // Sorting
    if (sortingOption === 'priority') {
      adjustedTickets.sort((a, b) => a.priority - b.priority);
    } else if (sortingOption === 'title') {
      adjustedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Grouping
    if (groupingOption === 'user') {
      let groupedTickets = {};
      adjustedTickets.forEach((ticket) => {
        const userId = ticket.userId;
        if (!groupedTickets[userId]) {
          groupedTickets[userId] = [];
        }
        groupedTickets[userId].push(ticket);
      });
      return groupedTickets;
    } else if (groupingOption === 'priority') {
      let groupedTickets = {};
      adjustedTickets.forEach((ticket) => {
        const priority = ticket.priority;
        if (!groupedTickets[priority]) {
          groupedTickets[priority] = [];
        }
        groupedTickets[priority].push(ticket);
      });
      return groupedTickets;
    } else if (groupingOption === 'status') {
      let groupedTickets = {};
      adjustedTickets.forEach((ticket) => {
        const status = ticket.status;
        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }
        groupedTickets[status].push(ticket);
      });
      return groupedTickets;
    }

    return adjustedTickets;
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const priorityLabels = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return (
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'0 5px -3px 0'}}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7.5 4.21l0 .01"></path><path d="M4.21 7.5l0 .01"></path><path d="M3 12l0 .01"></path><path d="M4.21 16.5l0 .01"></path><path d="M7.5 19.79l0 .01"></path><path d="M12 21l0 .01"></path><path d="M16.5 19.79l0 .01"></path><path d="M19.79 16.5l0 .01"></path><path d="M21 12l0 .01"></path><path d="M19.79 7.5l0 .01"></path><path d="M16.5 4.21l0 .01"></path><path d="M12 3l0 .01"></path></svg>
        );

      case 'Todo':
        return (
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'0 5px -3px 0'}}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path></svg>
        );

      case 'In progress':
        return (
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"  style={{'color':'rgb(245, 200, 66)','margin':'0 5px -3px 0'}}><path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path></svg>
        );

      case 'Done':
        return (
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color': 'rgb(56, 75, 181)','margin':'0 5px -3px 0'}}><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path></svg>
        );

      case 'Cancelled':
        return (
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'0 5px -3px 0'}}><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm8.036-4.024a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L12 10.939Z"></path></svg>
        )
    

      default:
        return null;
        }
      };
  return (
    <div>
      <button onClick={toggleOptions}>Display Options</button>

      {showOptions && (
        <div>
          <div>
            Group by:
            <select onChange={(e) => setGroupingOption(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            Sort by:
            <select onChange={(e) => setSortingOption(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      <div className="main-card-header">
        {groupingOption === 'user' &&
          data.users.map((user) => (
            <div key={user.id} className="sub-main-head">
            <div className="sub-main-title">
            <div>
           
            
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'0 5px -3px 0'}}><path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"></path></svg>
            
              {user.name} {displayedTickets[user.id] ? displayedTickets[user.id].length : 0} 
              </div>
              <div className="hd-icons">
                 <div className="icon-wrap">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                 </div>
                 <div className="icon-wrap">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></svg>
                 </div>
              </div>
              </div>
              {displayedTickets[user.id] &&
                displayedTickets[user.id].map((ticket) => (
                  <div key={ticket.id} className="sub-main-item">
                    {ticket.title}
                  </div>
                ))}
            </div>
          ))}

        {groupingOption === 'priority' &&
          [0, 1, 2, 3, 4].map((priority) => (
            <div key={priority} className="sub-main-head">
              {priorityLabels[priority]} ({displayedTickets[priority] ? displayedTickets[priority].length : 0} tickets)
              {displayedTickets[priority] &&
                displayedTickets[priority].map((ticket) => (
                  <div key={ticket.id} className="sub-main-item">
                    {ticket.title}
                  </div>
                ))}
            </div>
          ))}

        {groupingOption === 'status' &&
          ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].map((status) => (
            <div key={status} className="sub-main-head">
            <div className="sub-main-title">
            <div>
            {getStatusIcon(status)}



            
              <span className="st-title">{status}</span> <span className="cnt">{displayedTickets[status] ? displayedTickets[status].length : 0} </span> 
              </div>
              <div className="hd-icons">
                 <div className="icon-wrap">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                 </div>
                 <div className="icon-wrap">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></svg>
                 </div>
              </div>
              </div>
              {/* {status} ({displayedTickets[status] ? displayedTickets[status].length : 0} tickets) */}
              {displayedTickets[status] &&
                displayedTickets[status].map((ticket) => (
                  <div key={ticket.id} className="sub-main-item">
                    {ticket.title}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};


  
export default Card