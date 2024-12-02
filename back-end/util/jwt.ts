import jwt from 'jsonwebtoken'

const generateJwtToken = ({ firstname, role }: { firstname: string; role: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'lab-06' }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({ firstname, role }, process.env.JWT_SECRET, options)
    } catch (error) {
        console.log(error)
        throw new Error('Error generating JWT token, see server log for details.')
    }
};

export { generateJwtToken }