import sys
import rhash

def generate_hash(message):
    return rhash.hash_msg(message, rhash.HAS160)

if __name__ == "__main__":
    input_message = sys.argv[1]
    print(generate_hash(input_message))