import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Button,Table, TableBody,Form,Grid} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import {deleteClass,editClass,getClasses,sendNotification} from '../actions/Manager'
import InfoStudentList from './InfoStudentList'
import QhereList from '../components/QhereList'
import {Link} from 'react-router-dom';

class ClassInfo extends Component{

    state={
        id:"",
        class:"",
        title:"",
        content:"",
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    componentWillMount(){
        var _id = window.location.pathname.slice(18, 42);
        var classes=this.props.classes
        classes.find(instance=>{
            if(instance._id===_id)
            {
                this.setState({
                    id:_id,
                    class:instance
                })
            }
            return null;
        })
    }

    onDelete=()=>{
        this.props.deleteClass(this.state.id)
        this.props.getClasses()
    }

    render(){

        console.log(this.state)
        const Info=(
            <Grid columns={2} divided>
                <Grid.Row>
                <div style={style.list}>
                <Grid.Column>
                    <List divided relaxed>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.header}>{this.state.class.className}</List.Header>
                            <Button as={Link} to={'/homePage/classes'} color='red' style={style.button} onClick={this.onDelete}>Sil</Button>
                            <Button as={Link} to={`/homePage/updateClass/${this.state.id}`} color='yellow' style={style.button}>Düzenle</Button>  
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.header}>Kontenjan</List.Header>
                            <List.Description>{this.state.class.quota}</List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.header}>Devamsızlık</List.Header>
                            <List.Description>{this.state.class.discontinuity}</List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.header}>Açıklama</List.Header>
                            <List.Description>{this.state.class.description}</List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.studentHeader}>Haftalar</List.Header>
                            <List.Description>
                                <Table style={style.table}>
                                    <QhereList class={this.state.class}/>
                                </Table>    
                            </List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Content>
                            <List.Header style={style.studentHeader}>Öğrenciler</List.Header>
                            <List.Description>
                                <Table>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Adı Soyadı</Table.HeaderCell>
                                    <Table.HeaderCell>Okul Numarası</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>
                                <TableBody>
                                    <InfoStudentList student={this.state.class.students} />
                                </TableBody>
                                </Table>
                            </List.Description>
                        </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
                </div>
                <div style={style.form}>
                <Grid.Column>
                    <Form>
                        <h1 class="ui header">Duyuru paylaş</h1>
                        <Form.Group widths='equal'>
                        <Form.Input 
                        fluid label='title' 
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='Title' />
                        </Form.Group>
                        <Form.Group inline>
                        </Form.Group>
                        <Form.TextArea 
                        label='content' 
                        name='content'
                        value={this.state.content}
                        onChange={this.handleChange}
                        placeholder='Content' />
                        <Form.Button onClick={()=>{this.props.sendNotification(this.state);this.setState({id:"",title:"",content:"",})}}>Paylaş</Form.Button>
                    </Form>
                </Grid.Column>
                </div>
                </Grid.Row>  
            </Grid>
        )

        return(
            <div>
                { this.props.classes.length === 0 ? <Redirect to="/homePage"/> : Info }
            </div>
        )
    }
}

const style={
    header:{
        float:'Left',
        fontSize: 16
    },
    button:{
        float:'Right',
        padding:10,
    },
    list:{
        marginTop:50,
        marginLeft:175,
        padding:20,
        width: 600,
        borderStyle: 'groove',
        borderRadius: 25,
    },
    form:{
        marginTop:50,
        marginLeft:175,
        padding:20,
        width: 300,
        borderStyle: 'groove',
        borderRadius: 25,
    },
    studentHeader:{
        float:'Left',
        fontSize: 16,
        marginBottom:12
    },
    table:{
        border:'hidden'
    }
    
}

const mapStateToProps=(state)=>{
    return{
        classes:state.manager.classes,
    }
}

const mapDispatchToProps={
    deleteClass,
    editClass,
    getClasses,
    sendNotification
}

export default connect(mapStateToProps,mapDispatchToProps) (ClassInfo)