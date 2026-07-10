const Button = (props) => {
    const {
        className = '',
        type = 'button',
        children,
        isDisabled,
        onClick

    } = props
    return (
        <button className={`button ${className}`} type={type} onClick={onClick} disabled={isDisabled}>{children}</button>
    )
}

export default Button