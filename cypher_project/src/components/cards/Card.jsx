import './card.css'
import { useContext,useState,useEffect } from 'react'
import DataContext from '../../context/data/DataContext'

const Card = () => {

    
  
    const data = useContext(DataContext);
    const [groupingOption, setGroupingOption] = useState('status');
    const [sortingOption, setSortingOption] = useState('priority');
    const [displayedTickets, setDisplayedTickets] = useState([]);
  
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
  
      return adjustedTickets;
    };
  
    const renderHeaders = () => {
      if (groupingOption === 'user') {
        return data.users.map((user) => <div key={user.id}>{user.name}</div>);
      } else if (groupingOption === 'priority') {
        return [0, 1, 2, 3, 4].map((priority) => <div key={priority}>Priority {priority}</div>);
      } else if (groupingOption === 'status') {
        return ['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled'].map((status) => (
          <div key={status}>{status}</div>
        ));
      }
  
      // Default headers (if no specific grouping option is selected)
      return (
        <div>
          <div>User</div>
          <div>Priority</div>
          <div>Status</div>
        </div>
      );
    };
  
    if (!data) {
      return <div>Loading...</div>;
    }
  
    return (
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
  
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {renderHeaders()}
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {displayedTickets.map((ticket) => (
            <div key={ticket.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
              {groupingOption === 'user' && <div>{ticket.userId}</div>}
              {groupingOption === 'priority' && <div>Priority {ticket.priority}</div>}
              {groupingOption === 'status' && <div>{ticket.status}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Card