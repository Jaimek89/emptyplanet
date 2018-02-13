/** */
/* Api Countries fetch data from countries using restcountries API
/*
/* Endpoint http://restcountries.eu/rest/v2/
/* Methods searchAllCountries --> endpoint query 'all'
/*         searchByName --> endpoint query 'name/'
/*
/** */
let apiCountries;
(() => { 
    const base = 'https://restcountries.eu/rest/v2/'
    apiCountries = {
        base,
        call : function ( query ) {
            return fetch( query.substr(-3).toLowerCase() === 'svg' ? query : base + query )
                .then( response => {
                    return( response.status === 200 ) ? response.json() : response.messageText ;
                }) 
        },
        searchAllCountries : function() {
             return this.call( 'all')
             .then( result => result )
        },
        searchByName : function(query) {
            return this.call( 'name/' + query)
            .then( result => result )
        },
        getFlag : function (urlFlag){ 
            return this.call( urlFlag )
            .then( result => result )
        }       
    }

})()
export default apiCountries