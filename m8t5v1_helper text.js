componentDidMount(){
    const search=window.location.search;
    const params=new URLSearchParams(search);
    const city_name=params.get('city');

    fetch(`${base_path}/api/get_properties_by_city.php?city=${city_name}`) //change here
        .then(response=>response.json())
        then(responseData=>{
            this.setState({
                properties:responseData   //change here         
        });
    })

        .catch(error=>{
        console.log('Error fetching and parsing data',error);
    });
}

//this code remains the same for all ,just change the above mentioned things when creating another webpage.