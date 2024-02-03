import React from 'react';
import Sidebar from './SideBar';
import Inbox from './Inbox';

const MailContainer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <Inbox/>
          {/* <Switch>
            <Route path="/inbox" component={Inbox} />
            <Route path="/sent" component={Sent} />
            <Route path="/drafts" component={Drafts} />
          </Switch> */}
        </main>
      </div>
    </div>
  );
};

export default MailContainer;
