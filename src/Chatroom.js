import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        let randomChat = [
            {
                username: "Shashank",
                conversation: [
                    {
                        type: "visitor",
                        content: "hi 123",
                        timestamp: "Visitor: 13: 24"
                    },
                    {
                        type: "agent",
                        content: "how can I be of help",
                        timestamp: "You: 13: 25"
                    },
                    {
                        type: "visitor",
                        content: "help me with ID 20002",
                        timestamp: "Visitor: 13: 26"
                    },
                    {
                        type: "agent",
                        content: "sure, hang on a moment",
                        timestamp: "You: 13: 27"
                    }
                ]
            }
        ];

        this.state = {
            chats: [randomChat[Math.floor(Math.random() * randomChat.length)]]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    minimize(e) {
        // Convert the below to a component
        let chatroomContainerEl = document.getElementById("chatroom-container");
        if (chatroomContainerEl.classList.contains("active")) {
            chatroomContainerEl.style.height = "40px"
            chatroomContainerEl.classList.remove("active");
            chatroomContainerEl.classList.add("minimized");
        } else {
            chatroomContainerEl.style.height = "300px";
            chatroomContainerEl.classList.remove("minimized");
            chatroomContainerEl.classList.add("active");
        }
    }

    endConvo(e) {
        e.preventDefault();
        e.target.style.display = "none";
        document.getElementById("delete-icon").style.display = "block";
        document.getElementById("end-convo-banner").style.display = "block";
        document.getElementById("input-textarea").setAttribute("disabled", "true");
        document.getElementById("submit-textarea").style.pointerEvents = "none";
        document.getElementById("chatroom-container").style.height = "326px";
    }

    deleteConvo(e) {
        e.preventDefault();
        document.getElementById("chatroom-container").remove();
    }

    submitMessage(e) {
        e.preventDefault();

        document.getElementById('wave').classList.remove("hide");

        const messageNow = ReactDOM.findDOMNode(this.refs.msg).value;

        ReactDOM.findDOMNode(this.refs.msg).value = "";

        // Convert the below to a component
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            // eslint-disable-next-line 
            var s = today.getSeconds();
            // add a zero in front of numbers<10
            m = checkTime(m);
            s = checkTime(s);
            return h + ":" + m;
        }
        startTime();

        let randomReplies = ["sure thing", "welcome", "thank you", "good day"];

        setTimeout(() => {
            this.setState({
                chats: this.state.chats.concat([{
                    conversation: [
                        {
                            type: "agent",
                            content: <p>{messageNow}</p>,
                            timestamp: "You: " + startTime()
                        }
                    ]
                }])
            });
            document.getElementById('wave').classList.add("hide");

            document.getElementById('wave').classList.remove("hide");

            setTimeout(()=> {
                this.setState({
                    chats: this.state.chats.concat([{
                        conversation: [
                            {
                                type: "visitor",
                                content: randomReplies[Math.floor(Math.random() * randomReplies.length)],
                                timestamp: "Agent: " + startTime()
                            }
                        ]
                    }])
                });
                document.getElementById('wave').classList.add("hide");
            }, 2000);
        }, 1500);
    }

    render() {
        const { chats } = this.state;
        const userName = chats[0].username;

        return (
            <div>
                <div className="chatroom active" id="chatroom-container">
                    <div className="chatroom-utils">
                        <h3 onClick={(e) => this.minimize(e)}>{userName}
                        </h3>
                        <span className="close-icon" onClick={(e) => this.endConvo(e)}>X</span>
                        <span id="delete-icon" className="delete-icon" onClick={(e) => this.deleteConvo(e)}>D</span>
                    </div>
                    <ul className="chats" ref="chats">
                        {
                            chats.map((chat) =>
                                // Convert the below to a component
                                chat.conversation.map(function (item) {
                                    // Convert the below to a component
                                    if (item.type === "visitor") {
                                        return <li className="chat left">
                                            {item.content}
                                            <span className="timestamp">{item.timestamp}</span>
                                        </li>
                                    } else {
                                        return <li className="chat right">
                                            {item.content}
                                            <span className="timestamp">{item.timestamp}</span>
                                        </li>
                                    }
                                })
                            )
                        }
                        <li className="chat">
                            <div id="wave" className="hide">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </li>
                    </ul>
                    <p id="end-convo-banner">Your conversation has been ended</p>
                    <form id="input-container" className="input" onSubmit={(e) => this.submitMessage(e)}>
                        <input type="text" ref="msg" id="input-textarea" />
                        <input type="submit" value="Submit" id="submit-textarea" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Chatroom;