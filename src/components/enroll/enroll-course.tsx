import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImPaypal } from "react-icons/im";
import { BsStripe } from "react-icons/bs";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { CgCircleci } from "react-icons/cg";
import { useState } from "react";
import publicApi from "@/publicApi";
import { useRouter } from 'next/navigation';






export function EnrollCourseDialog() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(false);
        // Here you would typically handle the form submission, e.g., send data to an API
        const response = await publicApi.post("/api/attempted-payment/", {
            name: name,
            email: email,
            payment_method: paymentMethod,
        });

        if (response.status === 201) {
            // Handle successful submission, e.g., show a success message
            console.log("Enrollment successful:", response.data);
            if (paymentMethod === "paypal") {
                router.replace('https://www.paypal.com/ncp/payment/L5SAYFKPRXJRC');
            } else if (paymentMethod === "stripe") {
                router.replace('https://buy.stripe.com/fZe5mjcHs4Wt30QeV4');
            } else if (paymentMethod === "visa") {
                router.replace('https://buy.stripe.com/fZe5mjcHs4Wt30QeV4');
            } else if (paymentMethod === "opay") {
                setIsSubmitted(true)
                setPaymentInstructions("Please proceed to pay via OPay using the following details: Adewale Ogunleye, 8108368289. After payment, please send a screenshot of the transaction to @thehackbio on X (Twitter), HackBio on Linkedin or via email at: contact@thehackbio.com");
            } else if (paymentMethod === "mastercard") {
                router.replace('https://buy.stripe.com/fZe5mjcHs4Wt30QeV4');
            }
        } else {
            // Handle error case, e.g., show an error message
            console.error("Enrollment failed:", response.data);
        }

        // Reset form fields after submission
        setName("");
        setEmail("");
        setPaymentMethod("paypal");
        //setIsSubmitted(false);
    }
        

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Enroll for this Course.</DialogTitle>
            <DialogDescription>
              Enroll in the course by filling out the form below and proceeding to pay.
            </DialogDescription>
          </DialogHeader>
          {/* <div className="grid gap-5">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="Full Name" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="fullname@thehackbio.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 gap-4" >
                <Label className="flex flex-col items-start cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        className="peer sr-only"
                        defaultChecked
                        onClick={() => setPaymentMethod("paypal")}
                    />
                    <div className="flex flex-col items-center border-2 border-gray-300 peer-checked:bg-green-200 peer-checked:border-green-600 rounded-lg p-2 transition">
                        <ImPaypal className="text-2xl text-blue-900" />
                        <span className="mt-2 text-sm">Paypal</span>
                    </div>
                </Label>
                <Label className="flex flex-col items-start cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="stripe"
                        className="peer sr-only"
                        onClick={() => setPaymentMethod("stripe")}
                    />
                    <div className="flex flex-col items-center border-2 border-gray-300 peer-checked:bg-green-200 peer-checked:border-green-600 rounded-lg p-2 transition">
                        <BsStripe className="text-2xl text-purple-600" />
                        <span className="mt-2 text-sm">Stripe</span>
                    </div>
                </Label>
                <Label className="flex flex-col items-start cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="visa"
                        className="peer sr-only"
                        onClick={() => setPaymentMethod("visa")}
                    />
                    <div className="flex flex-col items-center border-2 border-gray-300  peer-checked:border-green-600 rounded-lg p-2 transition peer-checked:bg-green-200">
                        <RiVisaFill className="text-2xl text-blue-900" />
                        <span className="mt-2 text-sm">Visa</span>
                    </div>
                </Label>
                <Label className="flex flex-col items-start cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="opay"
                        className="peer sr-only"
                        onClick={() => setPaymentMethod("opay")}
                    />
                    <div className="flex flex-col items-center border-2 border-gray-300 peer-checked:bg-green-200 peer-checked:border-green-600 rounded-lg p-2 transition">
                        <CgCircleci className="text-2xl text-blue-900" />
                        <span className="mt-2 text-sm">OPay</span>
                    </div>
                </Label>
                <Label className="flex flex-col items-start cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="mastercard"
                        className="peer sr-only"
                        onClick={() => setPaymentMethod("mastercard")}
                    />
                    <div className="flex flex-col items-center border-2 border-gray-300 peer-checked:bg-green-200 peer-checked:border-green-600 rounded-lg p-2 transition">
                        <FaCcMastercard className="text-2xl text-blue-900" />
                        <span className="mt-2 text-sm">MasterCard</span>
                    </div>
                </Label>
            </div>
          </div> */}
            <div className="flex flex-col gap-5">
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                    <p className="text-base text-yellow-900">Enrollment for this course is currently only possible through the internship enrollment. Kindly visit <a href="/internship" className="font-bold underline">Open Internships</a> page.</p>
                </div>
            </div>
            {isSubmitted && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                    <p className="text-sm text-yellow-900">{paymentInstructions}</p>
                </div>
            )}
          <DialogFooter>
            { <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose> }
            {/* <Button type="submit" onClick={handleSubmit} className="px-7 py-5 text-white font-medium text-lg bg-green-600">Enroll</Button> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
