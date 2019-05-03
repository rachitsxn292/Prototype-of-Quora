import React, { Component } from 'react';
import axios from 'axios';
import url from '../Url/Url';

class Messages extends Component {

    constructor() {
        super();
        this.state = {
            messagesInbox: [],
            messagesOutbox: [],
            content: '',
            to: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        axios.get(url.url + 'messages', { params: { email: localStorage.getItem('email') } }).then(result => {
            this.setState({
                messagesInbox: this.state.messagesInbox.concat(result.data)
            })
        })

        axios.get(url.url + 'messages/sent', { params: { email: localStorage.getItem('email') } }).then(result => {
            this.setState({
                messagesOutbox: this.state.messagesOutbox.concat(result.data)
            })
        })
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (this.state.messagesInbox != undefined) {
            var displayInbox = this.state.messagesInbox.map(message => {
                return (
                    <tr class="">
                        <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                        <td class="view-message">{message.from}</td>
                        <td class="view-message">{message.content}</td>
                        <td class="view-message inbox-small-cells"></td>
                        <td class="view-message text-right">{message.date.substr(0, 10)}, {message.date.substr(11, 5)}</td>
                    </tr>
                );
            })
        }

        if (this.state.messagesOutbox != undefined) {
            var displayOutbox = this.state.messagesOutbox.map(message => {
                return (
                    <tr class="">
                        <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                        <td class="view-message">{message.to}</td>
                        <td class="view-message">{message.content}</td>
                        <td class="view-message inbox-small-cells"></td>
                        <td class="view-message text-right">{message.date.substr(0, 10)}, {message.date.substr(11, 5)}</td>
                    </tr>
                );
            })
        }


        return (
            <div>
                <div class="container">
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#messageModal">Compose New Message</button>
                    
                    <div class="modal" id="messageModal">
                        <div class="modal-header">
                            <h5 class="modal-title"><strong>New Message</strong></h5>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div class="modal-body" style={{height: '250px'}} >
                            <div>
                                <input type="text" placeholder="Email" name="to" id="to" value={this.state.value} onChange={this.onChange} class="form-control"></input>
                            </div>
                            <br/>
                            <div>
                                <textarea type="text" name="content" class="questionAdd" value={this.state.content} onChange={this.onChange} placeholder="Your Message...." />
                            </div>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={() => {
                                const from = localStorage.getItem('email');
                                const { to, content } = this.state;
                                axios.post(url.url + 'messages', { to, from, content }).then(result => {
                                    alert(result.data.message);
                                })
                            }} >Send</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                    <br/><br/>
                    <div class="inbox-head">
                        <h3>Inbox</h3>
                    </div>
                    <div class="inbox-body">
                        <table class="table table-striped table-hover">
                            <tbody>
                                {displayInbox}
                            </tbody>
                        </table>
                    </div>

                    <br /><br />
                    <div class="inbox-head">
                        <h3>Outbox</h3>
                    </div>
                    <div class="inbox-body">
                        <table class="table table-striped table-hover">
                            <tbody>
                                {displayOutbox}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Messages;





