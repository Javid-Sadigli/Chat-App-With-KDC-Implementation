const variables = require("../variables");
const path = require("path");
const filesystem = require("../toolkit/filesystem");

const database_path = path.join(variables.database_path, "messages.json");


class Message 
{
    #id; 
    constructor(from, to, subject, content, key)
    {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.content = content;
        this.key = key;
        this.#id = -1;
    }

    getId()
    {
        return this.#id;
    }

    save(CALLBACK)
    {
        Message.findAll((messages) => {
            const length = messages.length; 
            if(this.#id == -1)
            {
                if(length > 0){
                    this.#id = messages[length - 1].id + 1;
                } 
                else this.#id = 1;
                
                messages.push({
                    id: this.#id,
                    from: this.from, 
                    to: this.to,
                    subject: this.subject,
                    content: this.content, 
                    key: this.key
                }); 
            }
            else 
            {
                for(let i = 0; i < length; i++)
                {
                    if(messages[i].id == this.#id)
                    {
                        messages[i].from = this.from; 
                        messages[i].to = this.to;
                        messages[i].subject = this.subject;
                        messages[i].content = this.content;
                        messages[i].key = this.key;
                    }
                }
            }
            
            filesystem.writeToFile(database_path, messages, CALLBACK);
        });
    }

    static findAll(CALLBACK)
    {
        filesystem.readFromFile(database_path, (data) => 
        {
            return CALLBACK(data);
        }); 
    }

    static filterByFrom(from, CALLBACK)
    {
        Message.findAll((messages) => {
            const length = messages.length;
            let filtered_messages = [];
            for(let i = 0; i < length; i++)
            {
                if(messages[i].from == from)
                {
                    filtered_messages.push(messages[i]);
                }
            }; 
            CALLBACK(filtered_messages);
        });
    }

    static filterByTo(to, CALLBACK)
    {
        Message.findAll((messages) => {
            const length = messages.length;
            let filtered_messages = [];
            for(let i = 0; i < length; i++)
            {
                if(messages[i].to == to)
                {
                    filtered_messages.push(messages[i]);
                }
            }; 
            CALLBACK(filtered_messages);
        });
    }

    

}



module.exports = Message;