import './cardItems.css'
import PropTypes from 'prop-types';

const CardItems = (props) => {

const prioritySymbolHandler=(priorityStage)=>{
  console.log(priorityStage);
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

  return (
    <div className="main-container">
        <div className="sub-cont">
            <div className="sub-hd">
                <div className="sub-hd-tl"><span>{props.ticket_name}</span></div>
                <div className="sub-hd-logo">{props.username}</div>
            </div>
            <div className="sub-tl"><p>{props.ticket_title}</p></div>
            <div className="sub-desc">
                <div className="sub-desc-pt">
               {prioritySymbolHandler(props.ticket_priority)}
                </div>
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

};

export default CardItems