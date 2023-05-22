import '../../stylesheets/headers.css';
import '../../stylesheets/button.css';
import { UserUpdate } from './UserUpdate';

function ChangeRoleButtons({username, role, cookies, handleMessage, handleUserObtain}) {
    const handleSetRole = async (userRole) => {
        await UserUpdate(username, {role:userRole}, cookies, handleMessage);
        handleUserObtain();
    }
    return (
      <div className="cart-total item">
        <h2>Change user role to:</h2>
        {role!=="BUYER"?
        <button className="btn load-items" onClick={()=>handleSetRole("BUYER")}>
          Buyer
        </button> : <></>
        }
        {role!=='VENDOR'?
        <button className="btn load-items" onClick={()=>handleSetRole("VENDOR")}>
          Vendor
        </button>:<></>}
        {role!=='MANAGER'?
        <button className="btn load-items" onClick={()=>handleSetRole("MANAGER")}>
          Manager
        </button> : <></>
        }
      </div>
    );
  }
  
export default ChangeRoleButtons;