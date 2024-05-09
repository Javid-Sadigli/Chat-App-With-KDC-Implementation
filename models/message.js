const variables = require("../variables");
const path = require("path");
const filesystem = require("../toolkit/filesystem");

const database_path = path.join(variables.database_path, "messages.json");


class Message 
{
    #id; 
    constructor(from, to, subject, content)
    {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.content = content;
        this.#id = -1;
    }

    getId()
    {
        return this.#id;
    }

    save()
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
                    content: this.content
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

    static filterByFrom(from)
    {
        Message.findAll((messages) => {
            const length = messages.length;
            for(let i = 0; i < length; i++)
            {
                if(messages[i].from == from)
                {
                    return CALLBACK(messages[i]);
                }
            }; 
            CALLBACK(undefined);
        });
    }

    static filterByTo(to)
    {
        Message.findAll((messages) => {
            const length = messages.length;
            for(let i = 0; i < length; i++)
            {
                if(messages[i].to == to)
                {
                    return CALLBACK(messages[i]);
                }
            }; 
            CALLBACK(undefined);
        });
    }

    

}



module.exports = Message;