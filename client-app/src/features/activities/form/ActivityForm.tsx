import React, { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/modules/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm(){

    const{activityStore} = useStore();
    const{selectedActivity, closeForm, createACtivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        date: '',
        description: '',
        city: '',
        venue: ''
    }

    const[activity, setActivity] = useState(initialState);

    function handleSubmit(){
        activity.id ? updateActivity(activity) : createACtivity(activity)        
    }

    function handleInputCHhange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
        const{name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

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
                <Button onClick={closeForm} floated="right" type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})