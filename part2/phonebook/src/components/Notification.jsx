const Notification = ({message}) => {
    const notificationStyle = {
        color: 'green',
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