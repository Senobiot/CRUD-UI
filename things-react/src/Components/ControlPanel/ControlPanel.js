export const ControlPanel = () => {
    const btnsArray = ['get', 'post', 'put', 'delete'];
    
    return (
        <div>
            {
                btnsArray.map(e => <div>{e}</div>)
            }
        </div>
    )
}