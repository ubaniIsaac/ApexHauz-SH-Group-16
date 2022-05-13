const db = require("../config/db.config");
const moment = require("moment")


class Property {
    constructor(id, owner, price, state, city, address, type, imageUrl, dateCreated) {
        this.id = id;
        this.owner = owner;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.type = type;
        this.imageUrl = imageUrl;
        this.dateCreated = moment().format()
    }

    static getAll(result) {
        db.query('SELECT * FROM property', (err, res) => {
            if (err) {
                console.log(`error : ${err}`);
                result(null, err);
                return;
            }

            console.log(`property: ${res}`);
            result(null, res);
        })
    }

    static getById(id, result) {
        db.query(`SELECT * FROM property WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(`Property: ${res[0]}`);
                result(null, res[0]);
                return;
            }

            result({ kind: "not found" }, null);
        });

    }

    static createProperty(newProperty, output){
        //data is the query data sent back i.e NO. of row affected etc
        //output is a callback function that handles the request sent back to the user it takes in an error and a responce body

        db.query(`INSERT INTO property(owner,status,price,state,city,address,type,image_url,created_on) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [newProperty.owner,newProperty.status, newProperty.price, newProperty.state, newProperty.city, newProperty.address, newProperty.type, newProperty.image_url, (moment().format())],(err, queryData)=>{
            if(err){
                console.log(`ERROR: ${err}`);
                output(err, null);
                return
                
            }

            output(null, {
                ...newProperty,
            })
        })
    }

    static async markAsSold(propertyId, output){
        //this takes finds the property by ID and marks as sold

        await db.query(`UPDATE property SET status = "sold" WHERE id = ?`, [propertyId], (err, queryData)=>{
            if (err) {
                console.log(`ERROR: ${err}`)
                output(err, null)
                return
            }
            db.query(`SELECT * FROM property WHERE id=?`, [propertyId],(err, queryResponse,queryData)=>{
                if(err){
                    console.log(`ERROR: ${err}`);
                    output(err, null);
                    return;
                }
                output(null, queryResponse[0])
            })
        })
    }

    static async updateSpecs(propId,property,result){
        let queryData =[]
        await db.query(`SELECT * FROM property WHERE id=?`, [Number(propId)],(err, queryData2)=>{
            if (err){
                console.log(`ERROR: ${err}`)
                result(err, null)
                return; 
            }
            queryData = queryData2.slice()
            

            // result(null, queryData[0])

            const newOwner =  property.owner ? property.owner : queryData[0].owner ;
         const newStatus =  property.status ? property.status : queryData[0]["status"] ;
         const newPrice = property.price ? property.price : queryData[0].price ;
         const newState = property.state ? property.state : queryData[0].state ;
         const newCity =  property.city ?property.city : queryData[0].city ;
         const newAddress =  property.address ? property.address: queryData[0].address ;
         const newType =  property.type ? property.type : queryData[0].type ;
         const newImageURL =  property.image_url? property.image_url : queryData[0]["image_url"] ;
         const newCreatedOn =  property.created_on ? property.created_on : queryData[0].created_on ;



         db.query(`UPDATE property 
                         SET 
                             owner=?,
                             price=?,
                             state=?,
                             city=?,
                             address=?,
                             type=?,
                             image_url=?,
                             created_on=?`, [newOwner,newPrice,newState,newCity,newAddress,newType,newImageURL,newCreatedOn],(err,queryData)=>{
                                 if (err){
                                     console.log('here')
                                     console.log(`ERROR: ${err}`)
                                     result(err, null)
                                     return;
                                 }
                                 
                                 db.query(`SELECT * FROM property`,(eror, data)=>{
                                     if(err){
                                        console.log(`ERROR: ${err}`)
                                        result(eror, null)
                                        return;
                                     }
                                     result(null, {...data})
                                 })
                                 
                             })
        });
         
         
 
 
         
         
    }


}

module.exports = Property;