import React, { Component } from 'react';
import axios from 'axios';
import url from '../Url/Url';

class Messages extends Component {

    constructor(){
        super();
        this.state={
            messages: [],
            content: '',
            to: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        axios.get(url.url + 'messages', {params: {email: localStorage.getItem('email')}}).then(result=>{
            this.setState({
                messages: this.state.messages.concat(result.data)
            })
        })
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        var display = this.state.messages.map(message=>{
            return(
                <tr class="">
                    <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                    <td class="view-message">{message.from}</td>
                    <td class="view-message">{message.content}</td>
                    <td class="view-message inbox-small-cells"></td>
                    <td class="view-message text-right">{message.date}</td>
                </tr>
            );
        })

        return (
            <div>
                <div class="container">
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Compose New Message</button>
                    <div class="modal fade" id="myModal" role="dialog">
                        <div>
                            <div>
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">New Message</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">To</label>
                                            <div class="col-lg-10">
                                                <input type="text" placeholder="Email" name="to" id="to" value={this.state.value} onChange={this.onChange} class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">Message</label>
                                            <div class="col-lg-10">
                                                <textarea rows="2" cols="30" placeholder="Your Message...." class="form-control" name="content" id="content" value={this.state.value} onChange={this.onChange}></textarea>
                                            </div>    
                                    </div>              
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={()=>{
                                        const from = localStorage.getItem('email');
                                        const {to, content} = this.state;
                                        axios.post(url.url + 'messages', {to, from, content}).then(result=>{
                                            alert(result.data.message);
                                        })
                                    }}>Send</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                </div>            
                            </div>
                        </div>
                    </div>
                    <div class="inbox-head">
                        <h3>Inbox</h3>
                        </div>
                            <div class="inbox-body">
                                <table class="table table-striped table-hover">
                                    <tbody>
                                        {/* <tr class="">
                                            <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                                            <td class="view-message">JW Player</td>
                                            <td class="view-message">Last Chance: Upgrade to Pro for </td>
                                            <td class="view-message inbox-small-cells"></td>
                                            <td class="view-message text-right">March 15</td>
                                        </tr>           */}
                                        {display}
                                    </tbody>
                                </table>
                            </div>        
                </div>
            </div>    
                );
            }
}

export default Messages;