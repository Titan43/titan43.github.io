const Dashboard = (props) => {
    return (
      <div className="button-container item">
        {props.userRole === 'MANAGER' ? (
          <>
            <button
              className="btn load-items"
              id="viewOrders"
              onClick={() => (window.location.href = 'orders.html')}
            >
              View Orders
            </button>
            <button
              className="btn load-items"
              id="viewUser"
              onClick={() => (window.location.href = 'userView.html')}
            >
              View user data
            </button>
          </>
        ) : (
          <></>
        )}
        <button
          className="btn load-items"
          id="updateAcc"
          onClick={props.handleUserUpdateForm}
        >
          Change data
        </button>
        <button
          className="btn load-items remove"
          id="deleteAcc"
          onClick={() => (window.location.href = '')}
        >
          Delete account
        </button>
      </div>
    );
  };
  
export default Dashboard;