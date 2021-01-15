const { throws } = require('assert');
const fs = require('fs');
const { stringify } = require('querystring');
const crypto = require('crypto');

class userrepo {
    constructor(filename){
        if(!filename){
            throw Error('creating repository needs a file name');
        }
        this.filename = filename;
        try{
            fs.accessSync(this.filename)
        }catch(err){
            fs.writeFileSync(this.filename,'[]');
        }
    }

    async getAll(){
    return await JSON.parse(fs.readFileSync(this.filename, {encoding:'utf8'}));
        
    }

    async create(attrs){
        const allrecords = await this.getAll();
        attrs.id = this.randomID();
        allrecords.push(attrs);
      this.writeall(allrecords);
        
    }

    async writeall(allrecords){
       await fs.promises.writeFile(this.filename,JSON.stringify(allrecords, null, 2));
    }

    randomID(){
        return crypto.randomBytes(4).toString('hex');
    }
    async findID(id) {
        const allrecords = await this.getAll();
        const user = allrecords.find(record => record.id === id);
        console.log(user);
        
    }

    async deleteRecord(id){
        const allrecords = await this.getAll();
        const usersNotDelete = allrecords.filter(record => record.id !== id);
        this.writeall(usersNotDelete);
    }

    async update(id,attrs){
        const allrecords = await this.getAll();
        const findrecord = allrecords.find(record => record.id ===id);
        Object.assign(findrecord,attrs);
        this.writeall(allrecords);
    }

    async getOneBy(filters){
        const allrecords = await this.getAll();

        for(let record of allrecords){
           let found = true;

            for(let key in filters){
                if(record[key] !== filters[key]){
                    found = false;
                }
            }
            if(found){
                console.log(record);
            }
        }
    }

}

const test = async () =>{
const repo = new userrepo('use.json');

await repo.getOneBy({id: "560833e3",email:'pathumma'});
}
test();