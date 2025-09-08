const Notification = ({ message, messageState }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={messageState}>
            {message}
        </div>
    )
}

export default Notification
