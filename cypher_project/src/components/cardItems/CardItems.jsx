import './cardItems.css'

const CardItems = () => {
  return (
    <div className="main-container">
        <div className="sub-cont">
            <div className="sub-hd">
                <div className="sub-hd-tl"><span>CAM-7</span></div>
                <div className="sub-hd-logo">A</div>
            </div>
            <div className="sub-tl"><p>Create Onboarding Tutorial for New Users</p></div>
            <div className="sub-desc">
                <div className="sub-desc-pt">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{'color':'gray'}}><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path></svg>
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

export default CardItems