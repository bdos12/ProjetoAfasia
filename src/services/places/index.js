import RNGooglePlaces from 'react-native-google-places'


export default async function getLocalPlace(){
    RNGooglePlaces.getCurrentPlace(['name', 'types'])
    .then(local => console.log(local))
    .catch(err => console.log(err.message))
}