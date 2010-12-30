import sys
import json

from database import ComicsDB

if __name__ == "__main__":
    db = ComicsDB(sys.argv[1])
    comics = db.get_all()
    titles = ("id", "title", "alt", "transcript", "image_src")
    data = {"count": len(comics),
            "comics": dict([(int(comic[0]), dict(zip(titles, comic))) for comic in comics])}
    print json.dumps(data)
