
all:
	@echo "Installing root dependencies..."
	npm install
	npm run install:all
	npm run build:all

clean:
	@echo "Anything to clean?"

fclean: clean
	@echo "ANYTHING TO CLEAN!?"

re: fclean all

.PHONY: all clean fclean re