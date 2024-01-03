import bcrypt from 'bcryptjs';

export const genHashedPassword = async (password)=> {
     try {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
        
    } catch (error) {
        console.log(error)
    }
    
}

export const comparePassword = async (password, hashPassword)=>{
        try {
            const compare = await bcrypt.compare(password, hashPassword) 
            return compare;
        } catch (error) {
            console.log(error)
        }
}

