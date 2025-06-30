import scrapy
from pymongo import MongoClient

client=MongoClient("mongodb+srv://homapramodh567:2WDAqOPbmUcnqJmU@cluster0.zwhlbqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

def insert(collection,name,gpa,award,deadline,link=''):
    inserted=collection.insert_one({
        "name":name,
        "link":link,
        "gpa":gpa,
        "award":award,
        "deadline":deadline
    })
    return inserted.inserted_id
    

class FastwebSpider(scrapy.Spider):
    name = "fastweb"
    allowed_domains = ["fastweb.com"]
    start_urls = ["https://fastweb.com"]
    db=client.scholarship
    collection=db.scholarships
    def start_requests(self):
        urls=[
            {
                "name":"fastweb",
                "link":"https://www.fastweb.com/college-scholarships/featured-scholarships"
            },
            # {
            #     "name":"scholarships",
            #     "link":"https://www.scholarships.com/financial-aid/college-scholarships/"
            # }
        ]
        for url in urls:
            callback_method = getattr(self, f"parse_{url['name']}")
            yield scrapy.Request(url=url["link"], callback=callback_method,headers={"user-agent":"Mozilla/5.0"})


    def parse_fastweb(self, response):
        container=response.css(".featured-scholarship-wrapper")
        for item in container:
            name=item.css("h3>a::text").get()
            link=item.css("h3>a").attrib["href"]
            award=item.css(".award .amount::text").get()
            award=award[1:-1]
            deadline=item.css(".deadline .amount::text").get()
            deadline=deadline[1:-1]
            gpa=0
            insert(self.collection,name,gpa,award,deadline,link)
    
    def parse_scholarships(self,response):
        container=response.css(".award-box")
        for item in container:
            link=item.css("a").attrib["href"]
            name=item.css("h2::text").get()
            award=item.css("span::text")[0].get()
            deadline=item.css("span::text")[1].get()
            gpa=0
            print(name,link,award,gpa,deadline)
