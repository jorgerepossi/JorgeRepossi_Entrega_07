const fs = require( 'fs' )
class Products
{
  constructor ( name )
  {
    this.name = name
  }
  /**
   * It reads the file, parses the JSON, and returns the parsed JSON
   * @returns The JSON.parse() method parses a JSON string, constructing the JavaScript value or object
   * described by the string. An optional reviver function can be provided to perform a transformation
   * on the resulting object before it is returned.
   */
  async readFile ()
  {
    try {
      return JSON.parse( await fs.promises.readFile( `src/database/${ this.name }.json`, 'utf-8' ) )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }
  /**
   * It writes the data to the file.
   * @param data - The data you want to write to the file.
   */

  async writeFile ( data )
  {
    try {
      fs.promises.writeFile( `src/database/${ this.name }.json`, JSON.stringify( data ), 'utf-8' )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It tries to read the file, if it fails, it writes an empty array to the file, then it reads the
   * file again
   * @returns An array of objects
   */
  async getAll ()
  {
    try {
      const allItems = await this.readFile()
      return allItems
    } catch ( error ) {
      await this.writeFile( [] )
      const allItems = await this.readFile()
      return allItems
    }
  }

  /**
   * This function takes an id as an argument, reads the file, finds the item with the matching id, and
   * returns the item
   * @param id - The id of the item you want to get.
   * @returns The item found is being returned.
   */
  async getById ( id )
  {
    try {
      const allItems = await this.readFile()
      const itemFound = allItems.find( ( item ) => item.id === +id )
      return itemFound
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It reads the file, adds the new item to the array, and then writes the array back to the file
   * @param object - The object to be added to the file.
   */
  async addItem ( object )
  {
    try {
      const allItems = await this.readFile()
      allItems.push( object )
      await this.writeFile( allItems )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It reads the file, maps over the array of objects, and replaces the object with the matching id
   * with the new object
   * @param object - The object to be edited.
   */
  async editById ( object )
  {
    try {
      let allItems = await this.readFile()
      allItems = allItems.map( ( item ) => ( item.id !== object.id ? item : object ) )
      await this.writeFile( allItems )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It takes an id as an argument, reads the file, filters out the item with the matching id, and then
   * writes the filtered list back to the file
   * @param id - The id of the item to be deleted
   * @returns A boolean value.
   */
  async deleteById ( id )
  {
    try {
      const allItems = await this.readFile()
      const filteredItemList = allItems.filter( ( item ) => item.id !== +id )
      if ( JSON.stringify( allItems ) === JSON.stringify( filteredItemList ) ) {
        return false
      } else {
        await this.writeFile( filteredItemList )
        return true
      }
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }
  /**
   * It deletes all the data in the file
   */
  async deleteAll ()
  {
    try {
      await this.writeFile( [] )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It takes a containerId and an object as parameters, and then it adds the object into the container
   * with the given containerId
   * @param containerId - The id of the container you want to add the item into.
   * @param object - the object to be added to the container
   */
  async addItemInto ( containerId, object )
  {
    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find( ( item ) => item.id === +containerId )
      itemFound.productos.push( object )
      allItems = allItems.map( ( item ) => ( item.id !== itemFound.id ? item : itemFound ) )
      await this.writeFile( allItems )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /**
   * It removes an item from a container
   * @param containerId - The id of the container that contains the item to be removed.
   * @param objectId - The id of the object to be removed from the container.
   */
  async removeItemFrom ( containerId, objectId )
  {
    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find( ( item ) => item.id === +containerId )
      itemFound.productos = itemFound.productos.filter( ( item ) => item.id !== +objectId)
      allItems = allItems.map( ( item ) => ( item.id !== itemFound.id ? item : itemFound ) )
      await this.writeFile( allItems )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }

  /* Emptying the container. */
  async emptyContainer ( containerId )
  {

    try {
      let allItems = await this.readFile()
      let itemFound = allItems.find( ( item ) => item.id === +containerId )
      itemFound.productos = []
      allItems = allItems.map( ( item ) => ( item.id !== itemFound.id ? item : itemFound ) )
      await this.writeFile( allItems )
    } catch ( error ) {
      console.log( `ERROR: ${ error }` )
    }
  }
}

module.exports = Products