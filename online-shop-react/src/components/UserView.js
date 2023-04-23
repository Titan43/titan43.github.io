const UserBlock = ({ user }) => {
    console.log('user:', user);
    return (
      <div className='item'>
        <h2>{user.role}</h2>
        <p>Name: {user.fname} {user.sname}</p>
        <p>Email: {user.email}</p>
        <p>Phone number: {user.phoneNumber}</p>
        <p>Date of Birth: {user.dob}</p>
      </div>
    );
  };
  
export default UserBlock;