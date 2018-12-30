import React,{Component} from 'react'
import { Button, Form,Confirm } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {editClass} from '../actions/Manager' 
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Redirect} from 'react-router-dom';
   

class UpdateClass extends Component{

    constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state={
            classId:"",
            className:"",
            lastJoinTime:"",
            quota:"",
            discontinuity:"",
            description:"",
            redirect:false,
            reloadRedirect:false
        }
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    show = () => this.setState({ open: true })

    handleConfirm(){
        this.setState({ 
            open: false,
            redirect:true
        })
        this.props.editClass(this.state)
    }

    handleCancel(){
         this.setState({ open: false })
    }

    componentWillMount(){
        const{match:{params}}=this.props;
        var id =params.id;
        if(this.props.classes.length===0){
            this.setState({
                reloadRedirect:true
            })
        }
        this.props.classes.find(instance=>{
            if(instance._id===id){
                this.setState({
                    classId:instance._id,
                    className:instance.className,
                    lastJoinTime:instance.lastJoinTime,
                    quota:instance.quota,
                    discontinuity:instance.discontinuity,
                    description:instance.description,
                })
            }
            return null;
        })
    }



    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleDayChange(day) {
        this.setState({  lastJoinTime: day });
    }

    render(){
        const form=(
            <div>
                <Form style={style.UpdateClassForm}>
                    <Form.Field>
                    <label>Class Name</label>
                    <input
                    name='className'
                    value={this.state.className}
                    onChange={this.handleChange}
                    placeholder='Class Name' />
                    </Form.Field>
                    <Form.Field>
                    <label>Quota</label>
                    <input
                    name='quota'
                    value={this.state.quota}
                    onChange={this.handleChange}
                    placeholder='Quota' />
                    </Form.Field>
                    <Form.Field>
                    <label>Discontinuity</label>
                    <input
                    name='discontinuity'
                    value={this.state.discontinuity}
                    onChange={this.handleChange}
                    placeholder='Discontinuity' />
                    </Form.Field>
                    <Form.Field>
                    <label>Description</label>
                    <input
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder='Description' />
                    </Form.Field>
                    <Form.Field>
                    <label>Last Join Time</label>
                    <DayPickerInput 
                    value={this.state.lastJoinTime}
                    onDayChange={this.handleDayChange} />
                    </Form.Field>
                    <Button type='submit' onClick={this.show}>Düzenle</Button>
                                        <Confirm
                                        content="Sınıfı güncellemek istiyor musunuz?"
                                        open={this.state.open}
                                        onCancel={this.handleCancel}
                                        onConfirm={this.handleConfirm}
                                        />
                </Form>
            </div>
        )

        return(
            <div>
                {this.props.state.manager.Error.statusCode === 200 && this.state.redirect ? <Redirect to="/homePage/classes"/> : form }
                {this.state.reloadRedirect === true ? <Redirect to="/homePage/classes"/> : "" }
            </div>
        )
    }

}

const style={
    UpdateClassForm:{
        margin:'auto',
        marginTop:50,
        width: 500
    }
}

const mapStateToProps=(state)=>{
    return{
        classes:state.manager.classes,
        state:state
    }
}

const mapDispatchToProps={
    editClass
}

export default connect(mapStateToProps,mapDispatchToProps) (UpdateClass)