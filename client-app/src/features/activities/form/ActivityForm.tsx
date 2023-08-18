import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){

    const{activityStore} = useStore();
    const{selectedActivity, createACtivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const[activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        date: '',
        description: '',
        city: '',
        venue: ''
    });

    useEffect(()=>{
        if(id) 
            loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleSubmit(){
        if(!activity.id)
        {
            activity.id = uuid();
            createACtivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        }
        else{
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        }
    }

    function handleInputCHhange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
        const{name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content="Loading activity ..."/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputCHhange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputCHhange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputCHhange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputCHhange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputCHhange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputCHhange}/>
                <Button loading={loading} floated="right" positive type='submit' content='Submit'/>
                <Button  as={Link} to='/activities' floated="right" type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})