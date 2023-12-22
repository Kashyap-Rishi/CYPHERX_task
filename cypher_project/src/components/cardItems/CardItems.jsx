import './cardItems.css'
import PropTypes from 'prop-types';

const CardItems = (props) => {

const prioritySymbolHandler=(priorityStage)=>{
 
  switch(priorityStage){
    case 0:
      return(
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"></path></svg>
      );

      case 1:
        return(
<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M2 20h.01"></path><path d="M7 20v-4"></path></svg>
                );

        case 2:
          return(
<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path></svg>
                  );

          case 3:
            return(
           <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'style':'gray'}}><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path></svg>
                    );

            case 4:
              return(
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color': 'rgb(245, 138, 66)'}}><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                      );
                

  }
}
const statusSymbolHandler = (statusStage) => {
  switch (statusStage) {
    case 'Backlog':
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'20px 5px -10px 0'}}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7.5 4.21l0 .01"></path><path d="M4.21 7.5l0 .01"></path><path d="M3 12l0 .01"></path><path d="M4.21 16.5l0 .01"></path><path d="M7.5 19.79l0 .01"></path><path d="M12 21l0 .01"></path><path d="M16.5 19.79l0 .01"></path><path d="M19.79 16.5l0 .01"></path><path d="M21 12l0 .01"></path><path d="M19.79 7.5l0 .01"></path><path d="M16.5 4.21l0 .01"></path><path d="M12 3l0 .01"></path></svg>
      );

    case 'Todo':
      return (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'20px 5px -10px 0'}}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path></svg>
      );

    case 'In progress':
      return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"  style={{'color':'rgb(245, 200, 66)','margin':'20px 5px -10px 0'}}><path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path></svg>
      );

    case 'Done':
      return (
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color': 'rgb(56, 75, 181)','margin':'20px 5px -10px 0'}}><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path></svg>
      );

    case 'Cancelled':
      return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray','margin':'20px 5px -10px 0'}}><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm8.036-4.024a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L12 10.939Z"></path></svg>
      )
  

   
      }
    };

  return (
    <div className="main-container">
        <div className="sub-cont">
            <div className="sub-hd">
                <div className="sub-hd-tl"><span>{props.ticket_name}</span></div>
              {props.username!=""&&  <div className="sub-hd-logo">{props.username}</div>}
            </div>
            <div className="sub-tl">
            {props.ticket_status!=""&&statusSymbolHandler(props.ticket_status)}
            <p>{props.ticket_title}</p></div>
            <div className="sub-desc">
            { props.ticket_priority!=5&&
                <div className="sub-desc-pt">
                
               {prioritySymbolHandler(props.ticket_priority)}
                
                </div>
            
            }
                <div className="sub-desc-tag">
                <div className="tag-wrapper">
                <div className="tag-wrap-sym">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
              <span>Feature Request</span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
CardItems.propTypes = {
  ticket_name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  ticket_title: PropTypes.string.isRequired,
  ticket_priority: PropTypes.string.isRequired,
  ticket_status: PropTypes.string

};

export default CardItems