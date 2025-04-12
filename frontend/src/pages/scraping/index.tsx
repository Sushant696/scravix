import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Terminal,
  Cpu,
  Code,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useInitiateScrap } from "@/hooks/scrap";
import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

function Scraping() {
  const scrapMutation = useInitiateScrap();
  const [scrapingResults, setScrapingResults] = useState<Quote[] | null>(null);

  const formik = useFormik({
    initialValues: {
      siteUrl: "",
      selectorType: "",
      selector: "",
    },
    onSubmit: (values) => {
      console.log(values);
      scrapMutation.mutate(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (scrapMutation.data?.success && scrapMutation.data?.data?.quotes) {
      setScrapingResults(scrapMutation.data.data.quotes);
    }
  }, [scrapMutation.data]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 min-h-screen">
      <div className="w-full container mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Terminal className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              Web Scraper Tool
            </h1>
          </div>
          <Badge
            variant="outline"
            className="bg-indigo-100 text-indigo-800 border-indigo-200 px-3 py-1"
          >
            Beta
          </Badge>
        </div>
        <p className="text-gray-600 mb-6">
          Extract data from websites easily with our powerful scraping tool.
          Enter a URL and selector details below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full container">
        <Card className="w-full md:col-span-2 shadow-lg border-t-4 border-t-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-500" />
              Scraping Configuration
            </CardTitle>
            <CardDescription>
              Configure your scraping parameters below
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="siteUrl"
                  className="text-sm font-medium flex items-center"
                >
                  Site URL <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="siteUrl"
                  name="siteUrl"
                  type="text"
                  placeholder="https://example.com"
                  onChange={formik.handleChange}
                  value={formik.values.siteUrl}
                  className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">
                  Enter the full URL including https://
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="selectorType"
                  className="text-sm font-medium flex items-center"
                >
                  Selector Type <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  onValueChange={(val) =>
                    formik.setFieldValue("selectorType", val)
                  }
                  value={formik.values.selectorType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Selector Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selector Type</SelectLabel>
                      <SelectItem value="id">ID</SelectItem>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem disabled value="tag">
                        Tag
                      </SelectItem>
                      <SelectItem disabled value="xpath">
                        XPath
                      </SelectItem>
                      <SelectItem disabled value="css">
                        CSS Selector
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Some selector types are currently unavailable
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="selector"
                  className="text-sm font-medium flex items-center"
                >
                  Selector <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="selector"
                  name="selector"
                  type="text"
                  placeholder="Enter your selector"
                  onChange={formik.handleChange}
                  value={formik.values.selector}
                  className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">
                  Example: "main-content" for ID or "product-card" for class
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center"
                disabled={scrapMutation.isPending}
              >
                {scrapMutation.isPending ? "Processing..." : "Start Scraping"}
                {!scrapMutation.isPending && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="w-full space-y-6">
          <Card className="shadow-md bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-l-indigo-500">
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg flex items-center text-indigo-800 mb-3">
                <AlertCircle className="h-5 w-5 mr-2 text-indigo-600" />
                Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Make sure the site allows scraping
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Use inspect element to find selectors
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  Class selectors work best for repeated elements
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-blue-50 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg flex items-center text-blue-800 mb-3">
                <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                Status
              </h3>
              <div className="flex items-center justify-between text-sm bg-white p-3 rounded-md">
                <span className="text-gray-700">API Service</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Online
                </Badge>
              </div>
              {scrapMutation.isPending && (
                <div className="mt-3 flex items-center justify-between text-sm bg-white p-3 rounded-md">
                  <span className="text-gray-700">Request Status</span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Processing
                  </Badge>
                </div>
              )}
              {scrapMutation.isError && (
                <div className="mt-3 flex items-center justify-between text-sm bg-white p-3 rounded-md">
                  <span className="text-gray-700">Request Status</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    Error
                  </Badge>
                </div>
              )}
              {scrapMutation.isSuccess && (
                <div className="mt-3 flex items-center justify-between text-sm bg-white p-3 rounded-md">
                  <span className="text-gray-700">Request Status</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Success
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full container mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <Quote className="h-5 w-5 mr-2 text-blue-500" />
          Recent Scraping Results
        </h3>

        {!scrapingResults || scrapingResults.length === 0 ? (
          <div className="bg-gray-100 rounded p-3 text-sm text-gray-500 italic">
            No recent scraping results. Complete the form and click "Start
            Scraping" to see results here.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge className="bg-blue-100 text-blue-800">
                {scrapingResults.length} quotes found
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScrapingResults(null)}
                className="text-xs"
              >
                Clear Results
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
              {scrapingResults?.map((quote: Quote, index: number) => (
                <Card
                  key={index}
                  className="border-l-4 border-l-blue-400 shadow-sm"
                >
                  <CardContent className="pt-4">
                    <p className="text-gray-700 italic mb-2">{quote.text}</p>
                    <p className="text-right text-sm text-gray-600">
                      — {quote.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scraping;
