import 'package:flutter/material.dart';
import 'package:book_list1/models/book.dart';
import 'package:book_list1/repositories/book_repository.dart';
import 'package:book_list1/screens/detail_screen.dart';

class ListScreen extends StatelessWidget {
  final List<Book> books = BookRepository().getBooks();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("도서 목록 앱"),),
      ),
      body: ListView.builder(
        itemCount: books.length,
        itemBuilder: (context, index) {
          return BookTile(book: books[index]);
        },
      ),
    );
  }
}

class BookTile extends StatelessWidget {
  final Book book;
  BookTile({required this.book});
  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(book.title),
      leading: Image.network(book.image),
      onTap: (){
        Navigator.of(context).push(
          MaterialPageRoute(builder: (context) => DetailScreen(
            book: book,
          ),),
        );
      },
    );
  }
}
