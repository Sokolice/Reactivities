import React, { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/modules/activity";

interface Props{    
    closeForm:()=>void;
    activity: Activity | undefined;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({closeForm, activity: selectedActivity, createOrEdit}: Props){

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
        createOrEdit(activity);
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
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputCHhange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputCHhange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputCHhange}/>
                <Button floated="right" positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated="right" type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}