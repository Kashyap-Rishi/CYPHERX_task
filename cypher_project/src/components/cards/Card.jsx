import "./card.css";
import { useContext, useState, useEffect } from "react";
import DataContext from "../../context/data/DataContext";
import CardItems from "../cardItems/CardItems";

import ThemeContext from "../../context/theme/ThemeContext";
const Card = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const data = useContext(DataContext);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortingOption, setSortingOption] = useState(
    localStorage.getItem("sortingOption") || "priority"
  );

  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (data) {
      const adjustedTickets = groupAndSortTickets(
        data.tickets,
        groupingOption,
        sortingOption
      );
      setDisplayedTickets(adjustedTickets);
    }
  }, [data, groupingOption, sortingOption]);

  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
    localStorage.setItem("sortingOption", sortingOption);
  }, [groupingOption, sortingOption]);

  const groupAndSortTickets = (tickets, groupingOption, sortingOption) => {
    let adjustedTickets = [...tickets];

    if (sortingOption === "priority") {
      adjustedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === "title") {
      adjustedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (groupingOption === "user") {
      let groupedTickets = {};
      adjustedTickets.forEach((ticket) => {
        const userId = ticket.userId;
        if (!groupedTickets[userId]) {
          groupedTickets[userId] = [];
        }
        groupedTickets[userId].push(ticket);
      });
      return groupedTickets;
    } else if (groupingOption === "priority") {
      let groupedTickets = {};
      adjustedTickets.forEach((ticket) => {
        const priority = ticket.priority;
        if (!groupedTickets[priority]) {
          groupedTickets[priority] = [];
        }
        groupedTickets[priority].push(ticket);
      });
      return groupedTickets;
    } else if (groupingOption === "status") {
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
  const getUsernameForTicket = (ticketUserId) => {
    const user = data.users.find((user) => user.id === ticketUserId);
    return user ? user.name.split("")[0] : "Unknown User";
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -3px 5px" }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7.5 4.21l0 .01"></path>
            <path d="M4.21 7.5l0 .01"></path>
            <path d="M3 12l0 .01"></path>
            <path d="M4.21 16.5l0 .01"></path>
            <path d="M7.5 19.79l0 .01"></path>
            <path d="M12 21l0 .01"></path>
            <path d="M16.5 19.79l0 .01"></path>
            <path d="M19.79 16.5l0 .01"></path>
            <path d="M21 12l0 .01"></path>
            <path d="M19.79 7.5l0 .01"></path>
            <path d="M16.5 4.21l0 .01"></path>
            <path d="M12 3l0 .01"></path>
          </svg>
        );

      case "Todo":
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -3px 5px" }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          </svg>
        );

      case "In progress":
        return (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "rgb(245, 200, 66)", margin: "0 5px -3px 5px" }}
          >
            <path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path>
          </svg>
        );

      case "Done":
        return (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "rgb(56, 75, 181)", margin: "0 5px -3px 5px" }}
          >
            <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path>
          </svg>
        );

      case "Cancelled":
        return (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -3px 5px" }}
          >
            <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm8.036-4.024a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L12 10.939Z"></path>
          </svg>
        );

      default:
        return null;
    }
  };
  const getPriorityIcon = (priorityStage) => {
    console.log(priorityStage);
    switch (priorityStage) {
      case 0:
        return (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -2px 5px" }}
          >
            <path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"></path>
          </svg>
        );

      case 1:
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -2px 5px" }}
          >
            <path d="M2 20h.01"></path>
            <path d="M7 20v-4"></path>
          </svg>
        );

      case 2:
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -2px 5px" }}
          >
            <path d="M2 20h.01"></path>
            <path d="M7 20v-4"></path>
            <path d="M12 20v-8"></path>
          </svg>
        );

      case 3:
        return (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "gray", margin: "0 5px -2px 5px" }}
          >
            <path d="M2 20h.01"></path>
            <path d="M7 20v-4"></path>
            <path d="M12 20v-8"></path>
            <path d="M17 20V8"></path>
          </svg>
        );

      case 4:
        return (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "rgb(245, 138, 66)", margin: "0 5px -2px 5px" }}
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        );
    }
  };
  return (
    <div className={theme ? "parent-cont-dk" : "parent-cont-lt"}>
      <div className={theme ? "nav-head-dk" : "nav-head-lt"}>
        <div className="btn-display">
          <div
            className={theme ? "display-wrap-dk" : "display-wrap-lt"}
            onClick={toggleOptions}
          >
            <div>
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"
                ></path>
              </svg>
            </div>
            Display
            <div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
              </svg>
            </div>
          </div>

          {showOptions && (
            <div className={theme ? "sub-group-item-dk" : "sub-group-item-lt"}>
              <div
                className={theme ? "drop-item-group-dk" : "drop-item-group-lt"}
              >
                <span>Grouping</span>
                <select onChange={(e) => setGroupingOption(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div
                className={theme ? "drop-item-order-dk" : "drop-item-order-lt"}
              >
                <span>Ordering</span>
                <select onChange={(e) => setSortingOption(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div onClick={toggleTheme} className="dark_mode">
          {theme ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white" }}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"></path>
            </svg>
          )}
        </div>
      </div>

      <div className="main-card-header">
        {groupingOption === "user" &&
          data.users.map((user) => (
            <div key={user.id} className="sub-main-head">
              <div className="sub-main-title">
                <div>
                  <span className="usr-symb">{user.name.split("")[0]}</span>
                  <span className={theme ? "st-title-dk" : "st-title-lt"}>
                    {user.name}
                  </span>{" "}
                  <span className="cnt">
                    {displayedTickets[user.id]
                      ? displayedTickets[user.id].length
                      : 0}{" "}
                  </span>
                </div>
                <div className="hd-icons">
                  <div className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="icon"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "gray", marginRight: "5px" }}
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="icon"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "gray", marginRight: "5px" }}
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {displayedTickets[user.id] &&
                displayedTickets[user.id].map((ticket) => (
                  <div key={ticket.id} className="sub-main-item">
                    <CardItems
                      ticket_status={ticket.status}
                      ticket_priority={ticket.priority}
                      ticket_name={ticket.id}
                      ticket_title={ticket.title}
                      username=""
                    />
                  </div>
                ))}
            </div>
          ))}

        {groupingOption === "priority" &&
          [0, 1, 2, 3, 4].map((priority) => (
            <div key={priority} className="sub-main-head">
              <div className="sub-main-title">
                <div>
                  {getPriorityIcon(priority)}
                  <span className={theme ? "st-title-dk" : "st-title-lt"}>
                    {priorityLabels[priority]}
                  </span>{" "}
                  <span className="cnt">
                    {displayedTickets[priority]
                      ? displayedTickets[priority].length
                      : 0}{" "}
                  </span>
                </div>
                <div className="hd-icons">
                  <div className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="icon"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "gray", marginRight: "5px" }}
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="icon"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "gray", marginRight: "5px" }}
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {displayedTickets[priority] &&
                displayedTickets[priority].map((ticket) => (
                  <div key={ticket.id} className="sub-main-item">
                    <CardItems
                      ticket_status={ticket.status}
                      ticket_priority={5}
                      ticket_name={ticket.id}
                      ticket_title={ticket.title}
                      username={getUsernameForTicket(ticket.userId)}
                    />
                  </div>
                ))}
            </div>
          ))}

        {groupingOption === "status" &&
          ["Backlog", "Todo", "In progress", "Done", "Cancelled"].map(
            (status) => (
              <div key={status} className="sub-main-head">
                <div className="sub-main-title">
                  <div>
                    {getStatusIcon(status)}
                    <span className={theme ? "st-title-dk" : "st-title-lt"}>
                      {status}
                    </span>{" "}
                    <span className="cnt">
                      {displayedTickets[status]
                        ? displayedTickets[status].length
                        : 0}{" "}
                    </span>
                  </div>
                  <div className="hd-icons">
                    <div className="icon-wrap">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="icon"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "gray", marginRight: "5px" }}
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                      </svg>
                    </div>
                    <div className="icon-wrap">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className="icon"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "gray", marginRight: "5px" }}
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {displayedTickets[status] &&
                  displayedTickets[status].map((ticket) => (
                    <div key={ticket.id} className="sub-main-item">
                      <CardItems
                        ticket_status=""
                        ticket_priority={ticket.priority}
                        ticket_name={ticket.id}
                        ticket_title={ticket.title}
                        username={getUsernameForTicket(ticket.userId)}
                      />
                    </div>
                  ))}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Card;
