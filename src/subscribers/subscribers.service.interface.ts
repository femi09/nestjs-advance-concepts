import CreateSubscriberDto from './dto/createSubscriber.dto';
import Subscriber from './subscriber.service';
interface SubscribersService {
  addSubscriber(subscriber: CreateSubscriberDto): Promise<Subscriber>;
  getAllSubscribers(params: {}): Promise<{ data: Subscriber[] }>;
}

export default SubscribersService;
