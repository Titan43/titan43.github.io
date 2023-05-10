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
              onClick={props.handleUserGetForm}
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
          onClick={props.handleUserDelete}
        >
          Delete account
        </button>
      </div>
    );
  };
  
export default Dashboard;