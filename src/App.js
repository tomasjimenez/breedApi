import React, { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form} from 'react-bootstrap'
import './App.css'
import {CircularProgress} from '@material-ui/core'



const App = () => {
    const [breed, setBreed] = useState([])
    const [selectedBreed, setSelectedBreed] = useState("")
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
            for(let a in data.message){
                if(data.message[a].length !== 0 )
                    for(let b of data.message[a])
                        breed.push( a + " - " + b)
                else
                         breed.push(a)
                setBreed(prev => [...breed])
            }
        }).then((r) =>{
            setSelectedBreed(breed[0])
            loadImages(breed[0])
        })     
    }, [])

    const loadImages = (category) => {
        fetch(`https://dog.ceo/api/breed/${category}/images`)
            .then(response => response.json())
            .then(data => {
                setImages(prev => [...data.message])
            
        })    
    }

    return (
        <div className="app">
        
            <Form>
                <Form.Group>
                    <Form.Control as="select" onChange={
                        (e) => {
                            setSelectedBreed(e.target.value)
                            setImages([])
                            loadImages(selectedBreed)
                        }
                    }>
                        {
                            breed.map(b => {
                                return <option key={b}>{b}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
            {images.lenght === 0 ? <CircularProgress /> : 
                <div className="image-box">
                        {
                            images.map(i => {
                                console.log(i)
                                return (
                                    <img src={i}/>
                                )
                            })
                        }
                    </div>
                }
        </div>
    )
}

export default App
