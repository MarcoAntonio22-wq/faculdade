from bertopic import BERTopic
from sklearn.datasets import fetch_20newsgroups
print('.....')

docs = fetch_20newsgroups(subset='all',  remove=('headers', 'footers', 'quotes'))['data']
print('.....')

topic_model = BERTopic()
print('.....')

topics, probs = topic_model.fit_transform(docs)
print('.....')

topic_info = topic_model.get_topic_info()
print(topic_info)