import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';

import { createBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from 'src/schema/book.schema';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}
    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll()
    }
    @Post('')
    async createBook(@Body() book: createBookDto): Promise<Book>{
        return this.bookService.create(book);
    }
    @Get(':id')
    async getBook(@Param('id') id: string): Promise<Book>{
        return this.bookService.findById(id)
    }
    @Put(':id')
    async updateBook(
        @Param('id') 
        id: string, 
        @Body() 
        book: UpdateBookDto): Promise<Book>{
        return this.bookService.updateById(id,book);
    }
    @Delete(':id')
    async deleteBook(
        @Param('id') 
        id: string,
        ): Promise<Book>{
            return this.bookService.deleteId(id)
    }
}
