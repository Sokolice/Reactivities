import {makeAutoObservable, runInAction} from 'mobx';
import { Activity } from '../modules/activity';
import agent from '../api/agent';
import {v4 as uiid} from 'uuid';

export default class ActivityStore{

    activityregistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined  = undefined;
    editMode = false;
    loading = false;
    loadingInitial =true;


    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityregistry.values()).sort((a,b)=>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async() =>{
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity =>{
                activity.date = activity.date.split('T')[0];
                this.activityregistry.set(activity.id, activity);
              })
              this.setLoadingInitial(false);
           

        }
        catch(error){
            console.log(error);  
            this.setLoadingInitial(false);
        }

    }

    setLoadingInitial=(state: boolean) => {
        this.loadingInitial = state;
    }

    selecActivity = (id:string) => {
        this.selectedActivity = this.activityregistry.get(id);
    }

    cancelSelectedActivity = () =>{
        this.selectedActivity =undefined;
    }

    openForm = (id?:string) => {
        id ? this.selecActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;

    }

    closeForm =() =>{
        this.editMode = false;
    }

    createACtivity=async (activity:Activity)=>{
        this.loading = true;
        activity.id = uiid();
        try{
            await agent.Activities.create(activity);
            runInAction(() =>{
                this.activityregistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }


    }

    updateActivity =async (activity:Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityregistry.set(activity.id, activity);
                this.selectedActivity =activity;
                this.editMode = false;
                this.loading=false; 
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })          
        }
    }

    deleteActivity = async (id:string) =>{
        this.loading=true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{                
                this.activityregistry.delete(id);
                if(this.selectedActivity?.id === id) 
                    this.cancelSelectedActivity();
                this.loading = false;
            })
            
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

}