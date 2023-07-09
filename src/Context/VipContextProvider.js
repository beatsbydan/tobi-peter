import VipContext from './VipContext'

const VipContextProvider = (props) => {
    const value = {

    }
    return ( 
        <VipContext.Provider value={value}>
            {props.children}
        </VipContext.Provider>
    );
}
export default VipContextProvider;