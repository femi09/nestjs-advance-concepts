// mock config service
const mockedConfigService = {
    get(key:string){
        switch(key){
            case 'JWT EXPIRATION TIME': 
                return '3600'
        }
    }
}

export default mockedConfigService;

