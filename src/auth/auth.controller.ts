import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './authdto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';
import { Roles } from './roles/roles.decorator';

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

    
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    profile(@Req() req, @Res() res){
        return res.status(HttpStatus.OK).json(req.user);
    }

}