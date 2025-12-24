const Notification = ({message, type}) => {
    const notificationStyle = {
        color: type === "error"? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    }

    return (
      <div style={notificationStyle} >
        {message}
      </div>
    );
  }

export default Notification;