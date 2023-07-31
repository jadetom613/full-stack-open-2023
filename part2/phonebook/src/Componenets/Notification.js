const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    
    if (message.includes('success')){
        return (
            <div className='success-message'>
                {message}
            </div>
        ) 
    }else{
        return (
            <div className='error-message'>
                {message}
            </div>
        ) 
    }
    
}

export default Notification;