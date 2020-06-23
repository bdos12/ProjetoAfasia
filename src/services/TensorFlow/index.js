import { TfImageRecognition } from 'react-native-tensorflow'

const tfImageRecognition = new TfImageRecognition({
    model: require('./model/model.pb'),
    labels: require('./model/labels.txt'),
    // imageMean: 117, // Optional, defaults to 117
    // imageStd: 1 // Optional, defaults to 1
    imageMean: 117, // Optional, defaults to 117
    imageStd: 100 //teste
}) 


export default async function imageRecognition(imagePath){
    console.log(`imagePath: ${imagePath}`)
    try{
        const result = await tfImageRecognition.recognize({
            image: imagePath,
            inputName: "Mul", 
            inputSize: 299, 
            imageMean:128,
            imageStd:128,
            outputName: "final_result", 
            maxResults: 3, 
            threshold: 0.1, 
        })
        // await tfImageRecognition.close() -- Realizar testes dedesempenho
        console.log(result)
        return result[0].name
    }catch(err){
        console.log(err)
    }
}