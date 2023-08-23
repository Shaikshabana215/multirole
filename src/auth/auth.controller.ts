import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './authdto/authenticate.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    login(@Res() res, @Body() AuthenticateDto: AuthenticateDto){
        try{
            const response = this.authService.authenticate(AuthenticateDto);
            return res.status(HttpStatus.OK).json({response});
        } catch(error){
            return res.status(error.status).json(error.response);
        }
        }
    }

